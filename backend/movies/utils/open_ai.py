import os
import json
# from openai import OpenAI

import google.generativeai as genai

#Load your API key (set it in your .env)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
GENAI_KEYS = [
    # os.getenv("GEMINI_API_KEY_1"),
    # os.getenv("GEMINI_API_KEY_2"),
    os.getenv("GEMINI_API_KEY_3"),
    # os.getenv("GEMINI_API_KEY_4"),
    # os.getenv("GEMINI_API_KEY_5"),

]
# client = OpenAI(api_key=os.getenv("GEMINI_API_KEY_5"))

def extract_movie_info(video_title, video_description):
    combined_text = f"{video_title}\n\n{video_description}"

    model = genai.GenerativeModel("gemini-2.5-pro")  # or gemini-1.5-flash (faster & free)

    prompt = (
        "Extract movie or series information from the provided YouTube title and description. "
        "Return JSON with: `movie_title` (exact name of the movie or show), `year` (release year, if available), "
        "`country` (primary production country, if known), `genres` (list of genres, if identifiable), "
        "`confidence` (0-1 score for extraction accuracy). "
        "The title or description explicitly contains the movie/show name, often embedded with extra text like 'recap','season.' or others "
        "Use prior knowledge to identify the correct name, ignoring irrelevant phrases. "
        f"Input:\n{combined_text}"
    )

    for key in GENAI_KEYS:
        genai.configure(api_key=key)
        model = genai.GenerativeModel("gemini-2.5-pro")
        try:
            response = model.generate_content(prompt)
            text = response.text.strip()
            
            # Extract JSON safely
            json_start = text.find("{")
            json_end = text.rfind("}") + 1
            if json_start == -1 or json_end == -1:
                continue  # try next key

            parsed = json.loads(text[json_start:json_end])
            return parsed

        except Exception as e:
            print(f"Gemini API error with key {key}: {e}")
            continue  # try next key

    # if all keys fail
    return None
    # combined_text = f"{video_title}\n\n{video_description}"

    # prompt = (
    #     "You are extracting the EXACT official movie or TV show title.\n\n"

    #     "Rules (must follow strictly):\n"
    #     "1. The output title must be a real, officially released movie or TV show.\n"
    #     "2. DO NOT paraphrase, summarize, or reuse the YouTube title.\n"
    #     "3. If the official title cannot be identified with high confidence, "
    #     "set movie_title to null.\n"
    #     "4. Never invent a title.\n\n"

    #     "Return ONLY valid JSON with:\n"
    #     "- movie_title (string or null)\n"
    #     "- year (number or null)\n"
    #     "- confidence (0–1)\n\n"

    #     f"Input:\n{combined_text}"
    # )


    # try:
    #     response = client.responses.create(
    #         model="gpt-4.1-mini",  # fast & cheap, good for extraction
    #         input=prompt,
    #         max_output_tokens=300,
    #     )

    #     text = response.output_text.strip()

    #     # Extract JSON safely
    #     json_start = text.find("{")
    #     json_end = text.rfind("}") + 1
    #     if json_start == -1 or json_end == -1:
    #         return None

    #     return json.loads(text[json_start:json_end])

    # except Exception as e:
    #     print(f"OpenAI API error: {e}")
    #     return None