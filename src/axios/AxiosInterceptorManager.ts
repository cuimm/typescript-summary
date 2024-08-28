type onFulfilled<V> = (value: V) => V | Promise<V>
type onRejected = (error: any) => any

export interface Interceptor<V> {
  onFulfilled?: onFulfilled<V>
  onRejected?: onRejected
}

class AxiosInterceptorManager<V> {
  public interceptors: Array<Interceptor<V> | null> = []

  use(onFulfilled?: onFulfilled<V>, onRejected?: onRejected): number {
    this.interceptors.push({
      onFulfilled,
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
