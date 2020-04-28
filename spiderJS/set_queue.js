class set_queue
{
    constructor()
    {
        this.Q=[];
    }
    
    
    enqueue(val)
    {
        if(!this.isIn(val))
            this.Q.push(val);
    }
    dequeue()
    {
        return this.Q.shift();
    }
    isIn(val)
    {
        for(let item of this.Q)
        {
            if(item==val) 
                return true;
        }
        return false;
    }
    get queue()
    {
        return this.Q;
    }
    get isEmpty()
    {
        return !(!!+this.Q.length)
    }
};

module.exports=set_queue;