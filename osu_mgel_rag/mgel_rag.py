import os
from dotenv import load_dotenv

from openai import OpenAI
from pypdf import PdfReader
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

print("=== MGEL RAG (OpenAI chat + local TF-IDF) STARTING ===")

# 1. Load API key from .env and init OpenAI client
load_dotenv(override=True)
api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError(
        "OPENAI_API_KEY not found.\n"
        "Create a .env file in this folder with a line like:\n"
        "OPENAI_API_KEY=sk-your-real-key-here"
    )

print("OPENAI_API_KEY loaded from .env")
client = OpenAI(api_key=api_key)
print("OpenAI client initialized.")


# 2. Simple character-based chunking with overlap
def split_into_chunks(text, chunk_size=1000, overlap=200):
    chunks = []
    start = 0
    n = len(text)
    while start < n:
        end = start + chunk_size
        chunk = text[start:end]
        if chunk.strip():
            chunks.append(chunk)
        start = end - overlap
        if start < 0:
            start = 0
    return chunks


# 3. Load and chunk the PDF
pdf_path = "Engineering_Strategic_Plan_2018.pdf"  # file must be in this folder
print(f"Loading PDF: {pdf_path} ...")
reader = PdfReader(pdf_path)
num_pages = len(reader.pages)
print(f"Loaded {num_pages} pages.")

chunk_texts = []
chunk_meta = []  # store page numbers

for page_index in range(num_pages):
    page = reader.pages[page_index]
    text = page.extract_text() or ""
    if not text.strip():
        continue
    page_number = page_index + 1  # 1-based
    page_chunks = split_into_chunks(text, chunk_size=1000, overlap=200)
    for ch in page_chunks:
        chunk_texts.append(ch)
        chunk_meta.append({"page": page_number})

print(f"Created {len(chunk_texts)} text chunks from the PDF.")

# 4. Build a TF-IDF matrix for all chunks (local, no API)
print("Building TF-IDF matrix for chunks (local)...")
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(chunk_texts)
print("TF-IDF matrix ready.")


# 5. RAG helper: retrieve top-k similar chunks for a query (local)
def retrieve_top_k(query, k=4):
    print(f"Vectorizing query with TF-IDF: {query!r}")
    q_vec = vectorizer.transform([query])
    sims = cosine_similarity(q_vec, tfidf_matrix)[0]
    # highest similarities first
    top_indices = sims.argsort()[::-1][:k]
    return top_indices


# 6. System prompt (your constructed prompt)
SYSTEM_PROMPT = """
You are an assistant helping analyze Ohio State University's College of Engineering
"Engineering Strategic Plan 2018" document.

You are given some retrieved passages from the plan plus a user question.

Rules:
- Base your answers ONLY on information in the retrieved context.
- If you cannot find the answer in the context, say you do not know
  instead of guessing.

When the question is about the MGEL (Master of Global Engineering Leadership)
degree program, focus specifically on:

- How the plan defines or describes MGEL as a strategic initiative.
- How OSU planned to measure success of the MGEL program: outcome metrics,
  enrollment or completion goals, targets, timelines, and any assessment methods.

In your answers:
- Explain the metrics and assessment approach in clear, plain language.
- When possible, mention section titles and page numbers in parentheses,
  e.g., (MGEL section, p. 12).
"""

# 7. MGEL question (the investigation prompt)
MGEL_QUESTION = """
Using only the Engineering Strategic Plan 2018, explain how Ohio State University's
College of Engineering planned to measure the success of the MGEL (Master of Global
Engineering Leadership) degree program.

Identify any specific outcome metrics, targets, or assessment methods mentioned in
the plan, and include section titles and page numbers where they appear.
"""


def answer_question(question, k=6):
    print("Retrieving candidate chunks for the question (local TF-IDF)...")

    # 1) Get a larger pool of candidates using an MGEL-focused query
    mgel_query = (
        "MGEL Master of Global Engineering Leadership success metrics goals "
        "assessment evaluation targets enrollment completion outcomes"
    )
    candidate_indices = retrieve_top_k(mgel_query, k=30)
    print(f"Initial candidate indices (by TF-IDF): {candidate_indices}")

    # 2) Prefer chunks that explicitly mention MGEL / Global Engineering Leadership
    mg_keywords = [
        "MGEL",
        "Global Engineering Leadership",
        "Master of Global Engineering Leadership",
    ]

    def has_mgel_terms(text: str) -> bool:
        lower = text.lower()
        return any(kw.lower() in lower for kw in mg_keywords)

    mgel_indices = [i for i in candidate_indices if has_mgel_terms(chunk_texts[i])]

    if mgel_indices:
        print(f"MGEL-related indices found: {mgel_indices}")
        top_indices = mgel_indices[:k]
    else:
        print("No MGEL-specific chunks found in candidates; falling back to generic top-k.")
        top_indices = candidate_indices[:k]

    print("Using chunks:", top_indices)
    print("Pages for these chunks:", [chunk_meta[i]["page"] for i in top_indices])

    # 3) Build context from those chunks
    context_parts = []
    for idx in top_indices:
        page = chunk_meta[idx]["page"]
        text = chunk_texts[idx]
        context_parts.append(f"Page {page}:\n{text}")

    context_text = "\n\n---\n\n".join(context_parts)

    user_message = f"""
Here are some passages from the Engineering Strategic Plan 2018:

{context_text}

Question:
{question}

Remember: If the context does not actually answer some part of the question,
say you do not know rather than inventing information.
"""

    print("Calling OpenAI chat model with retrieved context...")
    chat_resp = client.chat.completions.create(
        model="gpt-4.1-mini",  # if this errors, switch to a model you know works
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
    )

    answer = chat_resp.choices[0].message.content
    print("\n=== FINAL ANSWER ===\n")
    print(answer)


if __name__ == "__main__":
    answer_question(MGEL_QUESTION)
