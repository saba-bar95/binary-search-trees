class Node {
  constructor(value) {
    this.value = value;
  }
}

class Tree {
  constructor(initialArr) {
    this.arr = initialArr;
    this.sortedUniqueArr();
    this.tree = {};
    this.buildTree(this.arr);
  }

  sortedUniqueArr() {
    this.arr = [
      ...new Set(
        this.arr.sort((a, b) => {
          return a - b;
        })
      ),
    ];
  }

  buildTree(arr) {
    if (!arr) return;
    const mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid + 1);
    if (left.length < 1) left = null;
    if (right.length < 1) right = null;
    const node = new Node(arr[mid]);
    this.insert(node);
    this.buildTree(left);
    this.buildTree(right);
  }

  insert(node) {
    if (!this.tree.root) {
      this.tree.root = node;
      return;
    }
    this.insertNode(this.tree.root, node);
  }

  insertNode(currentNode, node) {
    if (!currentNode) {
      return node;
    }

    if (currentNode.value > node.value) {
      while (currentNode.left && currentNode.value > node.value) {
        currentNode = currentNode.left;
      }
      if (currentNode.value > node.value) {
        currentNode.left = this.insertNode(currentNode.left, node);
      }
      if (node.value > currentNode.value) {
        this.insertNode(currentNode, node);
      }
      return;
    }

    if (node.value > currentNode.value) {
      while (currentNode.right && node.value > currentNode.value) {
        currentNode = currentNode.right;
      }
      if (node.value > currentNode.value) {
        currentNode.right = this.insertNode(currentNode.right, node);
      }
      if (currentNode.value > node.value) {
        this.insertNode(currentNode, node);
      }
    }
  }

  deleteNode(value) {}

  find(value, currentNode = this.tree.root) {
    if (currentNode.value === value) {
      return currentNode;
    }

    if (currentNode.value > value) {
      this.find(value, currentNode.left);
    }

    if (currentNode.value < value) {
      this.find(value, currentNode.right);
    }
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (!node) {
      return;
    }
    if (node.right && node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

bst.prettyPrint(bst.tree.root);
bst.find(5);
