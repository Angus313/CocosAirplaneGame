
import { _decorator, Component, Node, Collider, ITriggerEvent, ICollisionEvent } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = collider
 * DateTime = Tue May 10 2022 11:26:37 GMT+0800 (香港标准时间)
 * Author = Angus313313
 * FileBasename = collider.ts
 * FileBasenameNoExtension = collider
 * URL = db://assets/scripts/collider.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('collider')
export class collider extends Component {

    start() {
        //要么获取组件boxcollider，要么获取组件的基类collider
        const thisCollider = this.getComponent(Collider);
        //回调函数是叫TFunction的东西，它能传ITriggerEvent和ICollisionEvent的参数
        thisCollider.on("onCollisionEnter", this._onCollisionEnter, this);
        thisCollider.on("onCollisionStay", this._onCollisionStay, this);
        thisCollider.on("onCollisionExit", this._onCollisionExit, this);
        thisCollider.on("onTriggerEnter", this._onTriggerEnter, this);
        thisCollider.on("onTriggerStay", this._onTriggerStay, this);
        thisCollider.on("onTriggerExit", this._onTriggerExit, this);
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        console.log(this.node.name + "  target " + event.otherCollider.node.name + "  type " + event.type);
    }

    private _onTriggerStay(event: ITriggerEvent) {
        console.log(this.node.name + "  target " + event.otherCollider.node.name + "  type " + event.type);
    }
    private _onTriggerExit(event: ITriggerEvent) {
        console.log(this.node.name + "  target " + event.otherCollider.node.name + "  type " + event.type);
    }
    private _onCollisionEnter(event: ICollisionEvent) {
        console.log(this.node.name + "  target " + event.otherCollider.node.name + "  type " + event.type);
    }
    private _onCollisionStay(event: ICollisionEvent) {
        console.log(this.node.name + "  target " + event.otherCollider.node.name + "  type " + event.type);
    }
    private _onCollisionExit(event: ICollisionEvent) {
        console.log(this.node.name + "  target " + event.otherCollider.node.name + "  type " + event.type);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}
