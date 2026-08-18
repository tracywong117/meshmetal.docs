# Query Engine Overview

The Meshmetal query engine searches input sequence FASTA files against the database in a two-stage retrieval pipeline.

## Two-Stage Query Architecture

```mermaid
flowchart TD
    A["<div>Query FASTA sequence</div>"] --> B["<div>DML Subsequence Encoder</div>"]
    B -- "128-bit hash vectors" --> C["<div>STAGE 1: FAISS Search (Server Mode / Local)<br/>• Probes 16-bit hash buckets with bit flips (nflip)<br/>• Filters candidates within Hamming radius (r ≤ 28)<br/><b>Output:</b> Candidate 128-bit Hash IDs</div>"]
    C --> D["<div>STAGE 2: BRWT Matrix Search (Server Mode / Local)<br/>• Retrieves column accessions for candidate Hash IDs<br/>• Calculates k-mer / sequence coverage metrics<br/><b>Output:</b> Ranked SRA Accession IDs + Coverage</div>"]
```

## Key Query Modes

1. **Persistent Server Mode (Recommended)**:
   - Hosts `faiss_server` on a user-specified port (loads or mmaps index once).
   - Hosts `construct_BRWT server` on a user-specified port.
   - `query_seq.py` queries servers over HTTP REST APIs.
2. **Local Direct Mode**:
   - `query_seq.py` loads the `.faiss` index and `.brwt` tree directly into local process memory.
