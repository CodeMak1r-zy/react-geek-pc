import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class ChannelStore {
  constructor() {
    makeAutoObservable(this)
  }
  channelList = []

  // article  publish
  getChannelList = async () => {
    const res = await http.get('/channels')
    const { channels } = res.data
    this.channelList = channels
  }
}

export { ChannelStore }