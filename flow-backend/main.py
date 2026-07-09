from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
from typing import List
import datetime
import random  # For mock data

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load AI models
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
sentiment_analyzer = pipeline("sentiment-analysis")

class Category(BaseModel):
    id: int
    title: str
    description: str = ""  # Optional, default empty

class Section(BaseModel):
    id: int
    title: str
    category_id: int  # Link to category

# Expand Task (add to your existing Task class)
class Task(BaseModel):
    id: int
    title: str
    description: str
    due_date: str = ""  # e.g., "2025-08-20"
    priority: int = 0  # 0: low, 1: medium, 2: high
    reminders: List[str] = []  # e.g., ["2025-08-19 09:00"]
    labels: List[str] = []  # e.g., ["urgent"]
    section_id: int  # Link to section

# In-memory storage
categories = []
sections = []
tasks = []

@app.get("/")
def read_root():
    return {"message": "Welcome to Flow A.I."}

# Categories
@app.get("/categories")
def get_categories():
    return categories

@app.post("/categories")
def create_category(category: Category):
    # Check if id is unique
    if any(c.id == category.id for c in categories):
        # If duplicate ID found, raise error.
        raise HTTPException(status_code=400, detail="Duplicate Category ID")
    categories.append(category)
    return {"message": "Category created"}

# Sections
@app.get("/sections/{category_id}")
def get_sections(category_id: int):
    return [s for s in sections if s.category_id == category_id]

@app.post("/sections")
def create_sections(section: Section):
    if not any(c.id == section.category_id for c in categories):
        raise HTTPException(status_code=400, detail="Category ID does not exist")
    if any(s.id == section.id for s in sections):
        raise HTTPException(status_code=400, detail="Section ID already exists")
    sections.append(section)
    return {"message": "Section created"}

# Tasks
@app.get("/tasks")
def get_tasks():
    return tasks

@app.get("/tasks/section/{section_id}")
def get_tasks_by_section(section_id: int):
    return [t for t in tasks if t.section_id == section_id]

@app.post("/tasks")
def create_task(task: Task):
    # Loop over every section, if their ID doesn't match the task's ID, then raise error.
    if not any(s.id == task.section_id for s in sections):
        raise HTTPException(status_code=400, detail="Section ID does not exist")
    if any(t.id == task.id for t in tasks):
        raise HTTPException(status_code=400, detail="Task ID already exists")
    tasks.append(task)
    return {"message": "Task created"}


# AI Overview
@app.get("/ai-overview")
def get_ai_overview(user_id: int = 1):
    user_tasks = tasks  # Mock filter
    user_events = [{"title": "Team Meeting", "start": "2025-08-15", "end": "2025-08-15"}]
    user_whiteboard = [{"url": "mock_image.jpg", "description": "Project diagram"}]

    task_summaries = []
    for task in user_tasks:
        section = next((s for s in sections if s.id == task.section_id), None)
        category = next((c for c in categories if section and c.id == section.category_id), None)
        try:
            summary = summarizer(task.description, max_length=50, min_length=25, do_sample=False)[0]['summary_text']
        except:
            summary = task.description[:50] + "..."
        urgency_score = sentiment_analyzer(task.title + " " + task.description)[0]['score'] if 'urgent' in task.labels else 0.5
        task_summaries.append({
            "id": task.id,
            "title": task.title,
            "summary": summary,
            "due_date": task.due_date,
            "priority": task.priority,
            "urgency": urgency_score,
            "category": category.title if category else "Uncategorized",
            "section": section.title if section else "Unsectioned"
        })

    deadlines = [t for t in task_summaries if t['due_date'] and datetime.datetime.strptime(t['due_date'], "%Y-%m-%d") < datetime.datetime.now() + datetime.timedelta(days=7)]
    relevant_images = [img for img in user_whiteboard if any(word in img['description'].lower() for word in ['task', 'project'])]
    upcoming_events = [e for e in user_events if datetime.datetime.strptime(e['start'], "%Y-%m-%d") > datetime.datetime.now()]
    notifications = ["3 tasks due today"] if len(deadlines) > 0 else ["No urgent deadlines"]
    progress_score = random.uniform(5, 10)
    sentiment = sentiment_analyzer(f"User progress score: {progress_score}/10")[0]
    personal_message = "Great job! Keep up the momentum." if sentiment['label'] == 'POSITIVE' else "Let's improve on focus areas."

    return {
        "tasks": task_summaries,
        "deadlines": deadlines,
        "whiteboard_images": relevant_images,
        "events": upcoming_events,
        "notifications": notifications,
        "personal_messages": [personal_message],
        "productivity_score": progress_score
    }