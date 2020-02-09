class set_queue
{
    #queue
    constructor()
    {
        this.#queue=[];
    }
    
    
    enqueue(val)
    {
        if(!this.isIn(val))
            this.#queue.push(val);
    }
    dequeue()
    {
        return this.#queue.shift();
    }
    isIn(val)
    {
        for(let item of this.#queue)
        {
            if(item==val) 
                return true;
        }
        return false;
    }
    get queue()
    {
        return this.#queue;
    }
    get isEmpty()
    {
        return !(!!+this.#queue.length)
    }
}

module.exports=set_queue;