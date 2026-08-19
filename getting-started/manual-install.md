# Manual Installation

This guide details how to build and install all C++ and Python dependencies directly on a Linux system (without Docker).

## 1. System Requirements & System Packages

### Operating System
- Ubuntu 20.04 / 22.04 LTS (or equivalent Linux distribution)

### Required APT Packages
```bash
sudo apt-get update && sudo apt-get install -y \
    build-essential \
    cmake \
    zlib1g-dev \
    libboost-all-dev \
    autoconf \
    automake \
    libtool \
    libdeflate-dev \
    libssl-dev \
    curl \
    unzip \
    git \
    pkg-config \
    libomp-dev \
    wget \
    zstd \
    python3 \
    python3-pip \
    python3-dev
```

## 2. Installing SDSL-lite

Compile and install SDSL-lite directly from the repository's pinned submodule:

```bash
cd BRWT/construct_BRWT/external-libraries/sdsl-lite
./install.sh
```

*(By default, `./install.sh` installs to `~/include` and `~/lib`, which matches the Makefile's default include paths. To install system-wide instead, pass `/usr/local`: `./install.sh /usr/local && sudo ldconfig`).*

> [!NOTE]
> Always use the vendored `sdsl-lite` submodule in `BRWT/construct_BRWT/external-libraries/sdsl-lite` for this project to ensure full compatibility.

## 3. Python Environment & Dependencies

Install PyTorch and required Python packages:

```bash
pip3 install --no-cache-dir \
    torch==2.6 \
    torchvision==0.21 \
    numpy==1.26.4 \
    Flask \
    pybind11 \
    tqdm \
    requests \
    psutil \
    --extra-index-url https://download.pytorch.org/whl/cpu
```

*(For GPU support, replace `https://download.pytorch.org/whl/cpu` with your CUDA version, e.g. `https://download.pytorch.org/whl/cu126`).*

## 4. Compiling C++ Components

### A. C++ Sequence Preprocessor Extension
```bash
cd encoding/c++_preprocessor
python3 setup.py install
```

### B. CUDA Sequence Alignment Extension (`mutate_align`)
```bash
cd DML/mutate_align
export CUDA_HOME=/usr/local/cuda-12.4 # Set to your path of the NVIDIA CUDA Toolkit
export TORCH_CUDA_ARCH_LIST="8.6" # Set to your target GPU architecture (e.g. 7.0 for V100, 8.0 for A100, 8.6 for RTX 3090/A6000)
python3 -m pip install . --no-build-isolation
```

*(Note: `--no-build-isolation` uses your active environment's PyTorch/CUDA libraries to build the C++/CUDA extension).*

### C. BRWT Executable (`construct_BRWT`)
```bash
cd BRWT
cmake -S construct_BRWT -B build -DCMAKE_POLICY_VERSION_MINIMUM=3.5
cmake --build build -j$(nproc)
# Optional: install globally into system PATH
sudo cp build/construct_BRWT /usr/local/bin/
sudo find build/ -name "*.so*" -exec cp -P {} /usr/local/lib/ \;
sudo ldconfig
```

### D. Standalone FAISS & HTTP Server
```bash
cd standalone_faiss
g++ -O3 -march=native -fopenmp index_binary_hash_mmap.cpp -o index_mmap
g++ -O3 -march=native -fopenmp faiss_server.cpp -o faiss_server -lpthread
sudo cp index_mmap faiss_server /usr/local/bin/ # Optional: install globally into system PATH
```

### E. Standalone Index Tools (`build_index`)
```bash
cd build_index
make
sudo make install # Optional: install globally into system PATH
```
