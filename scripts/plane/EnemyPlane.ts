
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyPlane
 * DateTime = Fri May 06 2022 19:46:00 GMT+0800 (香港标准时间)
 * Author = Angus313313
 * FileBasename = EnemyPlane.ts
 * FileBasenameNoExtension = EnemyPlane
 * URL = db://assets/scripts/plane/EnemyPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

//敌机飞出了范围就应该被销毁了
const OUTOFBOUNCE = 50;

@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    //敌机的移动速度，由gameManager来配置其值
    private _enemySpeed = 0;

    start() {
        // [3]
    }

    update(deltaTime: number) {
        //因为是向下飞的，所以z值是正的，而玩家飞机是向上的，所以是朝着z的负方向
        const pos = this.node.position;
        //移动的距离
        const movePos = pos.z + this._enemySpeed;
        this.node.setPosition(pos.x, pos.y, movePos);

        //敌机大概飞到超过z轴50的位置就应该被销毁了
        if (movePos > OUTOFBOUNCE) {
            this.node.destroy();
        }
    }

    //写这个方法，是通过统一的接口，帮我把想要的配置都传进来
    public show(speed: number) {
        this._enemySpeed = speed;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
