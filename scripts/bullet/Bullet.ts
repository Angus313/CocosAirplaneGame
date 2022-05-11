
import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = bullet
 * DateTime = Thu May 05 2022 20:33:50 GMT+0800 (香港标准时间)
 * Author = Angus313313
 * FileBasename = bullet.ts
 * FileBasenameNoExtension = bullet
 * URL = db://assets/scripts/bullet/bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
//添加一个变量，用来表示它当前移动的最大的位置范围为50


@ccclass('Bullet')
export class Bullet extends Component {
    //定义一个速度属性
    private _bulletspeed = 0;
    private _isEnemyBullet = false;

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
        //让子弹每帧根据速度进行移动
        //先获取子弹的位置
        const pos = this.node.position;
        //如果是玩家的子弹让它每帧减去子弹移动的速度，如果是敌机的就相反
        let moveLength = 0;//因为后面会对它进行二次赋值，所以应该是let而非const
        if (this._isEnemyBullet) {
            moveLength = pos.z + this._bulletspeed;
            this.node.setPosition(pos.x, pos.y, moveLength);
            if (moveLength > 50) {
                this.node.destroy();
            }
        } else {
            moveLength = pos.z - this._bulletspeed;
            this.node.setPosition(pos.x, pos.y, moveLength);
            if (moveLength < -50) {
                this.node.destroy();
            }
        }
        //最后将得到的位置传给子弹节点
        //移动位置超出，就销毁这个节点
    }

    public show(speed: number, isEnemyBullet: boolean) {
        this._bulletspeed = speed;
        this._isEnemyBullet = isEnemyBullet;
    }

    //子弹只需销毁即可
    private _onTriggerEnter(event: ITriggerEvent) {
        console.log("Bullet Destroy");
        this.node.destroy();
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
