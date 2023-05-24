
/**
 * For a binary heap, in the array, the first index contains the root element. 
 * The next two indices of the array contain the root's children. 
 * The next four indices contain the four children of the root's two child nodes, and so on. 
 * Therefore, given a node at index i, its children are at indices 2i+1 and 2i+2, 
 * and its parent is at index (i−1)/2. 
 * This simple indexing scheme makes it efficient to move "up" or "down" the tree.
 */
class MaxHeap {

    constructor() {
        this.heap = new Array();
    }

    add(element) {
        this.heap.push(element);
        this.balance(this.heap.length - 1);
    }

    getMax() {

    }

    balance(index) {
        if (index === 0) {
            return;
        }
        let parentIndex = Math.floor((index - 1) / 2);
        let parent = this.heap[parentIndex];
        let element = this.heap[index]
        while (element > parent && index > 0) {
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
            element = this.heap[index]
            parent = this.heap[parentIndex];
        }
    }

}

const maxHeap = new MaxHeap();
maxHeap.add(10);    // [10]
maxHeap.add(8);     // [10,8]
maxHeap.add(7);     // [10,8,7]
maxHeap.add(12);    // [10,8,7,12] -> [10,12,7,8] -> [12,10,7,8]
console.log(maxHeap);