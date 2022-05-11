
import { _decorator, Component, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
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

    //在onEnable的时候监听，在onDisable的时候把事件取消掉，养成良好的习惯
    onEnable() {
        //首先获取碰撞组件
        const collider = this.getComponent(Collider);
        //监听触发事件
        collider.on("onTriggerEnter", this._onTriggerEnter, this);
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        collider.off("onTriggerEnter", this._onTriggerEnter, this);
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        //如果获取了另一个碰撞器，是可以知道它的碰撞分组的，这里获取一下分组
        const collisionGroup = event.otherCollider.getGroup();
        //如果分组为敌机或者是敌方子弹，执行掉血的逻辑
        if (collisionGroup === Constant.CollisionType.ENEMY_PLANE || collisionGroup === Constant.CollisionType.ENEMY_BULLET) {
            console.log("reduce player hp");
        }
    }
}
