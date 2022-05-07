
import { _decorator, Component, Input, EventTouch,Node } from 'cc';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIMain
 * DateTime = Thu May 05 2022 20:11:07 GMT+0800 (香港标准时间)
 * Author = Angus313313
 * FileBasename = UIMain.ts
 * FileBasenameNoExtension = UIMain
 * URL = db://assets/scripts/ui/UIMain.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('UIMain')
export class UIMain extends Component {
    //飞机飞行的速度
    @property
    public planeSpeed = 5;

    //飞机本体
    @property(Node)
    public playerplane: Node = null;

    //引用游戏管理类，主要是在这里调用gameManager里的isShooting方法
    @property(GameManager)
    public gameManager: GameManager = null;

    //监听触摸事件
    start() {
        this.node.on(Input.EventType.TOUCH_START, this._touchstart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this._touchend, this);
    }
    _touchstart(event: EventTouch) {
      this.gameManager.isShooting(true);
    }
    _touchMove(event: EventTouch) {
        const delta = event.getDelta();
        let pos = this.playerplane.position;
        this.playerplane.setPosition(pos.x + 0.01 * this.planeSpeed * delta.x, pos.y, pos.z - 0.01 * this.planeSpeed * delta.y);
    }
    _touchend(event: EventTouch) {
       this.gameManager.isShooting(false);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
