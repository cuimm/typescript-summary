type onFulfilled<V> = (value: V) => V | Promise<V>
type onRejected<T> = (error: any) => any
interface Interceptors<V> {
  onFullfilled?: onFulfilled<V>
  onRejected?: onRejected<V>
}

class AxiosInterceptorManager<V> {
  public interceptors: Array<Interceptors<V> | null> = []
  
  use(onFullfilled?: onFulfilled<V>, onRejected?: onRejected<V>): number {
    this.interceptors.push({
      onFullfilled,
      onRejected,
    })
    return this.interceptors.length - 1
  }
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}

export default AxiosInterceptorManager
