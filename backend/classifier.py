import re

def classify_text(text):
    """
    Classify the extracted text using rule-based keyword matching.
    """
    text_lower = text.lower()
    
    # Define keywords for each category
    task_keywords = [
        'homework', 'assignment', 'todo', 'due', 'deadline', 'complete', 'finish',
        'submit', 'task', 'project', 'work', 'study', 'exam', 'test', 'quiz'
    ]
    
    reminder_keywords = [
        'meeting', 'appointment', 'remind', 'schedule', 'event', 'calendar',
        'time', 'date', 'tomorrow', 'today', 'next week', 'monday', 'tuesday',
        'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    ]
    
    note_keywords = [
        'lecture', 'notes', 'summary', 'article', 'information', 'study',
        'chapter', 'section', 'page', 'book', 'reading', 'research'
    ]
    
    code_keywords = [
        'function', 'class', 'import', 'def ', 'var ', 'const ', 'let ',
        'print(', 'console.log', 'if ', 'for ', 'while ', 'return ',
        'public ', 'private ', 'void ', 'int ', 'string ', 'boolean',
        'select ', 'from ', 'where ', 'insert ', 'update ', 'delete ',
        '<html>', '<body>', '<div>', '<script>', 'git ', 'npm ', 'pip '
    ]
    
    # Count keyword matches
    task_score = sum(1 for keyword in task_keywords if keyword in text_lower)
    reminder_score = sum(1 for keyword in reminder_keywords if keyword in text_lower)
    note_score = sum(1 for keyword in note_keywords if keyword in text_lower)
    code_score = sum(1 for keyword in code_keywords if keyword in text_lower)
    
    # Check for code patterns (strong indicators)
    code_patterns = [
        r'\bdef\s+\w+\s*\(',  # Python function
        r'\bfunction\s+\w+\s*\(',  # JS function
        r'\bclass\s+\w+',  # Class definition
        r'import\s+\w+',  # Import statements
        r'<\w+>',  # HTML tags
        r'git\s+(add|commit|push|pull)',  # Git commands
        r'npm\s+install',  # NPM commands
        r'pip\s+install',  # PIP commands
    ]
    
    for pattern in code_patterns:
        if re.search(pattern, text_lower):
            code_score += 2  # Boost code score
    
    # Determine the type with highest score
    scores = {
        'TASK': task_score,
        'REMINDER': reminder_score,
        'NOTE': note_score,
        'CODE': code_score
    }
    
    max_type = max(scores, key=scores.get)
    
    # If all scores are 0, default to NOTE
    if scores[max_type] == 0:
        max_type = 'NOTE'
    
    # Generate title and summary based on type
    if max_type == 'TASK':
        title = extract_task_title(text)
        summary = f"Task identified: {text[:100]}{'...' if len(text) > 100 else ''}"
        actions = ["Mark as complete", "Set reminder", "Add to calendar"]
    elif max_type == 'REMINDER':
        title = extract_reminder_title(text)
        summary = f"Reminder: {text[:100]}{'...' if len(text) > 100 else ''}"
        actions = ["Set notification", "Add to calendar", "Mark as done"]
    elif max_type == 'NOTE':
        title = extract_note_title(text)
        summary = f"Note: {text[:100]}{'...' if len(text) > 100 else ''}"
        actions = ["Review later", "Add tags", "Share with others"]
    else:  # CODE
        title = extract_code_title(text)
        summary = f"Code snippet: {text[:100]}{'...' if len(text) > 100 else ''}"
        actions = ["Save to repository", "Test the code", "Document usage"]
    
    return {
        "type": max_type,
        "title": title,
        "summary": summary,
        "actions": actions
    }

def extract_task_title(text):
    """Extract a title for task items."""
    lines = text.strip().split('\n')
    first_line = lines[0].strip()
    
    # Look for task-like patterns
    task_patterns = [
        r'^(?:homework|assignment|task|todo):\s*(.+)$',
        r'^(.+?)(?:\s+due|\s+by|\s+deadline)',
        r'^(.+?)(?:\s+complete|\s+finish|\s+submit)'
    ]
    
    for pattern in task_patterns:
        match = re.search(pattern, first_line, re.IGNORECASE)
        if match:
            return match.group(1).strip()
    
    # Fallback to first line or first 50 chars
    return first_line[:50] if len(first_line) > 0 else "Task"

def extract_reminder_title(text):
    """Extract a title for reminder items."""
    lines = text.strip().split('\n')
    first_line = lines[0].strip()
    
    # Look for reminder patterns
    reminder_patterns = [
        r'^(?:meeting|appointment|reminder):\s*(.+)$',
        r'^(.+?)(?:\s+at\s+\d|\s+on\s+\w+|\s+tomorrow|\s+today)'
    ]
    
    for pattern in reminder_patterns:
        match = re.search(pattern, first_line, re.IGNORECASE)
        if match:
            return match.group(1).strip()
    
    return first_line[:50] if len(first_line) > 0 else "Reminder"

def extract_note_title(text):
    """Extract a title for note items."""
    lines = text.strip().split('\n')
    first_line = lines[0].strip()
    
    # Look for note patterns
    note_patterns = [
        r'^(?:lecture|notes|summary):\s*(.+)$',
        r'^(.+?)(?:\s+-\s+notes|\s+summary|\s+key\s+points)'
    ]
    
    for pattern in note_patterns:
        match = re.search(pattern, first_line, re.IGNORECASE)
        if match:
            return match.group(1).strip()
    
    return first_line[:50] if len(first_line) > 0 else "Notes"

def extract_code_title(text):
    """Extract a title for code items."""
    lines = text.strip().split('\n')
    
    # Look for function/class definitions
    for line in lines[:5]:  # Check first 5 lines
        line = line.strip()
        patterns = [
            r'\bdef\s+(\w+)',  # Python function
            r'\bfunction\s+(\w+)',  # JS function
            r'\bclass\s+(\w+)',  # Class
            r'import\s+(.+)',  # Import
        ]
        
        for pattern in patterns:
            match = re.search(pattern, line, re.IGNORECASE)
            if match:
                return f"Code: {match.group(1)}"
    
    # Fallback
    first_line = lines[0].strip()
    return first_line[:50] if len(first_line) > 0 else "Code Snippet"