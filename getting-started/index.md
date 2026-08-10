# Getting Started Overview

Meshmetal can be deployed in two primary ways depending on your environment:

## Option 1: Docker Guided Setup (Recommended for Testing)

The fastest way to test the complete pipeline (downloading, encoding, combining, annotating, BRWT building, FAISS indexing, and querying) is using our pre-built Docker environment.

- **Prerequisites**: Docker installed on your host system (NVIDIA GPU optional).
- **Target Audience**: New users, testing, reproduction of demo workflows.
- 👉 **[Read the Docker Guided Setup Guide](./docker.md)**

---

## Option 2: Manual Installation (Bare-Metal / HPC)

For large-scale production deployments on High-Performance Computing (HPC) clusters or dedicated server nodes.

- **Prerequisites**: Linux environment (Ubuntu 20.04/22.04 recommended), GCC with C++17 support, CMake, Python 3.10+, PyTorch, OpenMP.
- **Target Audience**: HPC cluster administrators, production indexing pipelines.
- 👉 **[Read the Manual Installation Guide](./manual-install.md)**
