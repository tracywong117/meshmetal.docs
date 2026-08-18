# Hosting Query Servers

Hosting query servers as persistent HTTP REST endpoints avoids reloading large index files into RAM on every query invocation.

## Helper Server Launcher (`demo/start_servers.sh`)

We provide a helper script `demo/start_servers.sh` that starts both the FAISS server and BRWT server in background processes:

```bash
./demo/start_servers.sh
```

*This hosts the FAISS server on port `8002` and the BRWT server on port `8001`.*

## Manual Server Execution

### 1. FAISS Server (`faiss_server`)

```bash
faiss_server <mode: ram|mmap> <index.faiss> [port]
```

- **`mode`**: `ram` (loads entire index into memory) or `mmap` (memory-maps disk file).
- **`index.faiss`**: Path to `.faiss` index file.
- **`port`**: Port number (e.g. `8002`).

```bash
# Example: start in ram mode on port 8002
faiss_server ram dataset.faiss 8002
```

#### Health Check
```bash
curl http://localhost:8002/health
# Output: {"status":"healthy","index_loaded":true,"mode":"ram","ntotal":60000000}
```

### 2. BRWT Server (`construct_BRWT server`)

```bash
construct_BRWT server <brwt_prefix> <columns_file> --port <port>
```

- **`<brwt_prefix>`**: Path prefix to the BRWT file (e.g. `path/to/dataset_BRWT` for `dataset_BRWT.brwt`).
- **`<columns_file>`**: Path to `dataset_BRWT.columns` text file.
- **`<port>`**: Port number (e.g. `8001`).

```bash
# Example: start on port 8001
construct_BRWT server dataset_BRWT dataset_BRWT.columns --port 8001
```
