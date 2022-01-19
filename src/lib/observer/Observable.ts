export class Observable<E>{
    private subscriptions: {id: string, func: Function}[] = [];
    private last: E = null;

    public next(data: E){
        this.last = data;
        for(let subscription of this.subscriptions){
            subscription.func(data);
        }
    }

    public subscribe(func: Function){
        let subscription = {id: "", func: func};
        this.subscriptions.push(subscription);
        subscription.func(this.last);
        return subscription;
    }
};