# Query Engine Overview

The Meshmetal query engine searches input sequence FASTA files against the database in a two-stage retrieval pipeline.

## Two-Stage Query Architecture

```mermaid
flowchart TD
    A["Query FASTA sequence"] --> B["DML Subsequence Encoder"]
    B -- "128-bit hash vectors" --> C["STAGE 1: FAISS Search (Port 8002 / Local)<br/>• Probes 16-bit hash buckets with bit flips (nflip)<br/>• Filters candidates within Hamming radius (r ≤ 28)<br/><b>Output:</b> Candidate 128-bit Hash IDs"]
    C --> D["STAGE 2: BRWT Matrix Search (Port 8001 / Local)<br/>• Retrieves column accessions for candidate Hash IDs<br/>• Calculates k-mer / sequence coverage metrics<br/><b>Output:</b> Ranked SRA Accession IDs + Coverage"]
```

## Key Query Modes

1. **Persistent Server Mode (Recommended)**:
   - Hosts `faiss_server.bin` on port `8002` (loads or mmaps index once).
   - Hosts `construct_BRWT server` on port `8001`.
   - `query_seq.py` queries servers over HTTP REST APIs.
2. **Local Direct Mode**:
   - `query_seq.py` loads the `.faiss` index and `.brwt` tree directly into local process memory.
