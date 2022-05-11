
import { _decorator, Component, Node, ITriggerEvent, Collider } from 'cc';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
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
    @property
    public createBulletTime = 0.5;
    //敌机的移动速度，由gameManager来配置其值
    private _enemySpeed = 0;
    //知道当前飞机是否需要发射子弹
    private _needBullet = false;
    private _gameManager: GameManager = null;

    private _currCreateBulletTime = 0;

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

    update(deltaTime: number) {
        //因为是向下飞的，所以z值是正的，而玩家飞机是向上的，所以是朝着z的负方向
        const pos = this.node.position;
        //移动的距离
        const movePos = pos.z + this._enemySpeed;
        this.node.setPosition(pos.x, pos.y, movePos);

        //如果需要发射子弹，再根据周期去执行发射子弹的逻辑
        if (this._needBullet) {
            this._currCreateBulletTime += deltaTime;
            if (this._currCreateBulletTime > this.createBulletTime) {
                //子弹需要知道当前的位置，所以需要传一个位置的参数
                this._gameManager.createEnemyBullet(this.node.position);
                this._currCreateBulletTime = 0;
                //子弹发射逻辑在gamemanager里
            }
        }

        //敌机大概飞到超过z轴50的位置就应该被销毁了
        if (movePos > OUTOFBOUNCE) {
            this.node.destroy();
        }

    }

    //敌机可能产生或不产生子弹，产生子弹也会有发射周期
    //写这个方法，是通过统一的接口，帮我把想要的配置都传进来
    public show(gameManager: GameManager, speed: number, needBullet: boolean) {
        this._gameManager = gameManager;
        this._enemySpeed = speed;
        this._needBullet = needBullet;
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        //如果获取了另一个碰撞器，是可以知道它的碰撞分组的，这里获取一下分组
        const collisionGroup = event.otherCollider.getGroup();
        //如果分组是玩家飞机或玩家子弹
        if (collisionGroup === Constant.CollisionType.SELF_PLANE || collisionGroup === Constant.CollisionType.SELF_BULLET) {
            console.log("EnemyPlane TriggerEnter");
            this.node.destroy();
            this._gameManager.addScore();
        }
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
