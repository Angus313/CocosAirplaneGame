
import { _decorator, Component, Node } from 'cc';
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
//添加一个常量，用来表示它当前移动的最大的位置范围为50
const OUTOFRANGE = 50;

@ccclass('Bullet')
export class Bullet extends Component {
    //定义一个速度属性
    @property
    public bulletspeed = 0;


    start () {
        // [3]
    }

    update (deltaTime: number) {
        //让子弹每帧根据速度进行移动
        //先获取子弹的位置
        const pos = this.node.position;
        //让它每帧减去子弹移动的速度
        const moveLength = pos.z - this.bulletspeed;
        //最后将得到的位置传给子弹节点
        this.node.setPosition(pos.x,pos.y,moveLength);

        //移动位置超出，就销毁这个节点
        if(moveLength > OUTOFRANGE){
            this.node.destroy();
            console.log("destroy");
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
