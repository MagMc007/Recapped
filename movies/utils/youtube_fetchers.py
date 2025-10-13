# yourapp/utils/youtube_fetcher.py
import requests


def fetch_videos_from_channel(channel_id, api_key, max_results=30):
    """
    Fetch the latest videos from a YouTube channel.
    
    Returns a list of items, each containing snippet and videoId.
    """
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "channelId": channel_id,
        "part": "snippet",
        "type": "video",
        "order": "date",
        "maxResults": max_results,
        "key": api_key
    }

    response = requests.get(url, params=params, timeout=15)
    response.raise_for_status()  # raises error if API fails

    data = response.json()
    return data.get("items", [])
