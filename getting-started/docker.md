# Docker Guided Setup

This guide describes how to build the Docker image, run the indexing pipeline, and host/query the database using the provided `demo` environment.

## Step 1: Build the Docker Image

On your host machine, build the Docker image:

```bash
docker build -t dml-seq-search:latest -f demo/Dockerfile .
```

### Building with GPU / CUDA Support
By default, the build installs CPU PyTorch. If you want to enable GPU/CUDA support (e.g. CUDA 12.4, 12.6, or 13.0), specify the corresponding PyTorch index directory via the `CUDA_VERSION` build argument:

```bash
# Example for CUDA 12.6 support:
docker build -t dml-seq-search:latest --build-arg CUDA_VERSION=cu126 -f demo/Dockerfile .
```

## Step 2: Configure the Base Path

Before running the container or the scripts, configure the path to your repository.

Replace `<your_path>` with the absolute directory path to where the `dml-seq-search` repository is stored on your machine in the following files:

* **`demo/pipeline_from_scratch.sh`** (Line 5: `base_path="<your_path>/dml-seq-search"`)
* **`demo/start_servers.sh`** (Line 3: `base_path="<your_path>/dml-seq-search"`)
* **`demo/query.sh`** (Line 3: `base_path="<your_path>/dml-seq-search"`)

## Step 3: Start the Docker Container

Start the container in interactive mode with the container name `seq_search`. Replace `<your_path>` with your repository's parent directory:

```bash
docker run -it --rm \
  --name seq_search \
  -v <your_path>/dml-seq-search:<your_path>/dml-seq-search \
  -w <your_path>/dml-seq-search \
  dml-seq-search:latest
```

## Step 4: Run the Indexing Pipeline

Inside the container, run the script to build your indices (Download → Encode → Combine → Annotate → BRWT → FAISS):

```bash
./demo/pipeline_from_scratch.sh
```

*Outputs (logs, downloaded sequences, embeddings, BRWT tree, and FAISS index) will be saved in `demo/sra_microbe_100_output/`.*

## Step 5: Host and Query the Database

To host the query servers and run the query script inside the container:

### Terminal 1: Start the Query Servers
Inside the active `seq_search` container, run the script to start the BRWT and Standalone FAISS servers:

```bash
./demo/start_servers.sh
```

### Terminal 2: Enter the Container and Run Queries
1. Open a **second terminal window** on your host machine.
2. Enter the running `seq_search` container instance:
   ```bash
   docker exec -it seq_search bash
   ```
3. Run the query script:
   ```bash
   ./demo/query.sh
   ```
   *The query script will print candidate sequences and coverage results directly to your screen.*

## Customizing for Your Own Data

To run the pipeline and queries on your own list of accessions:

1. **Accession List**: Place your custom SRA IDs inside a text file (one ID per line, similar to `demo/sra_microbe_100.txt`).
2. **Configure Dataset Name and Path**:
   Open `demo/pipeline_from_scratch.sh` and edit:
   * **Line 7** (`name="..."`): Set a unique name for your dataset.
   * **Line 9** (`accession_list_path="..."`): Point this to your new accession list file.

   Also update the `name` variable at the top of `demo/start_servers.sh` (Line 5) and `demo/query.sh` (Line 5) to match your dataset name.
