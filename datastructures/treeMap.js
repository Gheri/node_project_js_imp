export class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key, value) {
        const newNode = new Node(key, value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    findNode(node, key) {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            return this.findNode(node.left, key);
        } else if (key > node.key) {
            return this.findNode(node.right, key);
        } else {
            return node;
        }
    }

    get(key) {
        const node = this.findNode(this.root, key);
        return node ? node.value : null;
    }

    removeNode(node, key) {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            let aux = this.findMinNode(node.right);
            node.key = aux.key;
            node.value = aux.value;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }

    remove(key) {
        this.root = this.removeNode(this.root, key);
    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    findMaxNode(node) {
        if (node.right === null) {
            return node;
        } else {
            return this.findMaxNode(node.right);
        }
    }

    inorder(node, callback) {
        if (node !== null) {
            this.inorder(node.left, callback);
            callback(node);
            this.inorder(node.right, callback);
        }
    }

    preorder(node, callback) {
        if (node !== null) {
            callback(node);
            this.preorder(node.left, callback);
            this.preorder(node.right, callback);
        }
    }

    postorder(node, callback) {
        if (node !== null) {
            this.postorder(node.left, callback);
            this.postorder(node.right, callback);
            callback(node);
        }
    }

    size(node) {
        if (node === null) {
            return 0;
        }
        return this.size(node.left) + 1 + this.size(node.right);
    }

    containsValue(node, value) {
        if (node === null) {
            return false;
        }
        if (node.value === value) {
            return true;
        }
        return this.containsValue(node.left, value) || this.containsValue(node.right, value);
    }

    findCeiling(node, key) {
        if (node === null) return null;
        if (node.key === key) return node;
        if (node.key < key) return this.findCeiling(node.right, key);
        const ceil = this.findCeiling(node.left, key);
        return ceil ? ceil : node;
    }

    findFloor(node, key) {
        if (node === null) return null;
        if (node.key === key) return node;
        if (node.key > key) return this.findFloor(node.left, key);
        const floor = this.findFloor(node.right, key);
        return floor ? floor : node;
    }

    findHigher(node, key) {
        if (node === null) return null;
        if (node.key > key) {
            const left = this.findHigher(node.left, key);
            return left ? left : node;
        }
        return this.findHigher(node.right, key);
    }

    findLower(node, key) {
        if (node === null) return null;
        if (node.key < key) {
            const right = this.findLower(node.right, key);
            return right ? right : node;
        }
        return this.findLower(node.left, key);
    }
}

export class TreeMap {
    constructor() {
        this.tree = new BinarySearchTree();
    }

    clear() {
        this.tree.root = null;
    }

    containsKey(key) {
        return this.tree.get(key) !== null;
    }

    containsValue(value) {
        return this.tree.containsValue(this.tree.root, value);
    }

    entrySet() {
        const entries = [];
        this.tree.inorder(this.tree.root, node => entries.push([node.key, node.value]));
        return entries;
    }

    firstKey() {
        const node = this.tree.findMinNode(this.tree.root);
        return node ? node.key : null;
    }

    lastKey() {
        const node = this.tree.findMaxNode(this.tree.root);
        return node ? node.key : null;
    }

    get(key) {
        return this.tree.get(key);
    }

    isEmpty() {
        return this.tree.root === null;
    }

    keySet() {
        const keys = [];
        this.tree.inorder(this.tree.root, node => keys.push(node.key));
        return keys;
    }

    put(key, value) {
        this.tree.insert(key, value);
    }

    remove(key) {
        this.tree.remove(key);
    }

    size() {
        return this.tree.size(this.tree.root);
    }

    values() {
        const values = [];
        this.tree.inorder(this.tree.root, node => values.push(node.value));
        return values;
    }

    ceilingKey(key) {
        const node = this.tree.findCeiling(this.tree.root, key);
        return node ? node.key : null;
    }

    floorKey(key) {
        const node = this.tree.findFloor(this.tree.root, key);
        return node ? node.key : null;
    }

    higherKey(key) {
        const node = this.tree.findHigher(this.tree.root, key);
        return node ? node.key : null;
    }

    lowerKey(key) {
        const node = this.tree.findLower(this.tree.root, key);
        return node ? node.key : null;
    }

    pollFirstEntry() {
        const node = this.tree.findMinNode(this.tree.root);
        if (node) {
            this.tree.remove(node.key);
            return [node.key, node.value];
        }
        return null;
    }

    pollLastEntry() {
        const node = this.tree.findMaxNode(this.tree.root);
        if (node) {
            this.tree.remove(node.key);
            return [node.key, node.value];
        }
        return null;
    }
}

