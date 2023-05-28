
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
        if (this.heap.length === 0) {
            return undefined;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        const last = this.heap.pop();
        const max = this.heap[0];
        this.heap[0] = last;

        let i = 0;
        while (i <= this.heap.length - 1) {
            let leftChildIndex = 2 * i + 1;
            let rightChildIndex = 2 * i + 2;
            if (this.heap[leftChildIndex] > this.heap[i]) {
                this.swap(this.heap, leftChildIndex, i);
                i = leftChildIndex;
                continue;
            }
            if (this.heap[rightChildIndex] > this.heap[i]) {
                this.swap(this.heap, rightChildIndex, i);
                i = rightChildIndex;
                continue;
            }
            break;
        }

        return max
    }

    balance(index) {
        if (index === 0) {
            return;
        }
        let parentIndex = Math.floor((index - 1) / 2);
        let parent = this.heap[parentIndex];
        let element = this.heap[index]
        while (element > parent && index > 0) {
            this.swap(this.heap, index, parentIndex)
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
            element = this.heap[index]
            parent = this.heap[parentIndex];
        }
    }

    swap(array, i, j) {
        const iElement = array[i];
        array[i] = array[j];
        array[j] = iElement;
    }
}

const maxHeap = new MaxHeap();
maxHeap.add(10);    // [10]
maxHeap.add(8);     // [10,8]
maxHeap.add(7);     // [10,8,7]
maxHeap.add(12);    // [10,8,7,12] -> [10,12,7,8] -> [12,10,7,8]
console.log('maxHeap', maxHeap);

let max = maxHeap.getMax();
console.log('max', max);
console.log('maxHeap', maxHeap);

max = maxHeap.getMax();
console.log('max', max);
console.log('maxHeap', maxHeap);

max = maxHeap.getMax();
console.log('max', max);
console.log('maxHeap', maxHeap);