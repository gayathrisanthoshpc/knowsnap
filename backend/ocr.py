import pytesseract
from PIL import Image, ImageEnhance, ImageFilter
import os

def extract_text_from_image(image_path):
    """
    Extract text from an image using Tesseract OCR with preprocessing.
    """
    try:
        # Open the image
        img = Image.open(image_path)
        
        # Convert to grayscale
        img = img.convert('L')
        
        # Increase contrast
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(2.0)
        
        # Apply a slight blur to reduce noise (optional)
        img = img.filter(ImageFilter.MedianFilter(size=3))
        
        # Extract text
        text = pytesseract.image_to_string(img)
        
        # Clean up the text
        text = text.strip()
        
        return text
    except Exception as e:
        raise Exception(f"OCR failed: {str(e)}")