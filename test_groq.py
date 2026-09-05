import os

from dotenv import load_dotenv
from groq import Groq


load_dotenv()


api_key = os.getenv("GROQ_API_KEY")


print("API KEY FOUND:", bool(api_key))


if not api_key:
    raise Exception(
        "GROQ_API_KEY is missing from .env"
    )


client = Groq(
    api_key=api_key
)


print("\nAVAILABLE MODELS:\n")


models = client.models.list()


for model in models.data:

    print(model.id)