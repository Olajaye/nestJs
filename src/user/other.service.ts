import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class Otherservice {


  @OnEvent("video.created")
  notify({title}: {title: string}){
    console.log("Other-service", title)
    return 1
  }

  @OnEvent("video.created")
  notifys(){
    console.log("run second")
    return 2
  }
}  