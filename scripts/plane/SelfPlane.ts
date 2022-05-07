
import { _decorator, Component, Node, input, EventTouch, SystemEvent, Input, Touch } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SelfPlane
 * DateTime = Thu May 05 2022 19:10:25 GMT+0800 (香港标准时间)
 * Author = Angus313313
 * FileBasename = SelfPlane.ts
 * FileBasenameNoExtension = SelfPlane
 * URL = db://assets/scripts/SelfPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    @property
    public speed = 5;
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        input.on(Input.EventType.TOUCH_MOVE, this._touchMove, this);
    }


    _touchMove(event: EventTouch) {
        const delta = event.getDelta();
        let pos = this.node.position;
        this.node.setPosition(pos.x + 0.01 * this.speed * delta.x, pos.y, pos.z - 0.01 * this.speed * delta.y);
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}
