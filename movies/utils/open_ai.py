# yourapp/utils/openai_parser.py
import os
import json
from openai import OpenAI

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))  # load from .env

def extract_movie_info(video_title, video_description):
    """
    Given a video title and description, ask OpenAI to extract movie info.
    Returns a dictionary: {movie_title, year, country, genres, confidence}
    """
    combined_text = f"{video_title}\n\n{video_description}"

    # Define a function schema for structured output
    functions = [
        {
            "name": "extract_movie",
            "description": "Extract canonical movie title and metadata from YouTube video",
            "parameters": {
                "type": "object",
                "properties": {
                    "movie_title": {"type": "string", "description": "Canonical movie title"},
                    "year": {"type": "string", "description": "Year of release if known"},
                    "country": {"type": "string", "description": "Country of origin if known"},
                    "genres": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "List of probable genres"
                    },
                    "confidence": {"type": "number", "description": "Confidence score 0-1"}
                },
                "required": ["movie_title"]
            }
        }
    ]

    messages = [
        {
            "role": "system",
            "content": (
                "You are a parser that extracts movie info from YouTube video titles and descriptions. "
                "The movie names are explicitly mentioned in either the title or the description. "
                "Focus on those fields first and return only valid movie information. "
                "Return the data in JSON format with keys: movie_title, year, country, genres, confidence."
            )
        },
        {"role": "user", "content": combined_text}
    ]

    try:
        # NEW syntax
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            functions=functions,
            function_call={"name": "extract_movie"},
            temperature=0.0
        )
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return None

    # Parse function call response
    func_call = response.choices[0].message.get("function_call")
    if not func_call:
        return None

    try:
        return json.loads(func_call["arguments"])
    except json.JSONDecodeError:
        return None
