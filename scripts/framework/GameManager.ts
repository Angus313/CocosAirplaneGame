
import { _decorator, Component, Node, Prefab, instantiate, math, Vec3, Collider } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { EnemyPlane } from '../plane/EnemyPlane';
import { Constant } from './Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Thu May 05 2022 21:08:31 GMT+0800 (香港标准时间)
 * Author = Angus313313
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/scripts/framework/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('GameManager')
export class GameManager extends Component {
    //关联所有的玩家飞机和子弹
    @property(Node)
    public playerplane: Node = null;
    @property(Prefab)
    public bullet01: Prefab = null;
    @property(Prefab)
    public bullet02: Prefab = null;
    @property(Prefab)
    public bullet03: Prefab = null;
    @property(Prefab)
    public bullet04: Prefab = null;
    @property(Prefab)
    public bullet05: Prefab = null;
    //定义一个射击的周期
    @property
    public shootTime = 0.3;
    //子弹移动的速度
    @property
    public bulletSpeed = 1;
    //创建一个子弹的管理节点，将所有的子弹都放在这个节点下面
    @property(Node)
    public bulletroot: Node = null;

    //引用两个敌机的预制
    @property(Prefab)
    public enemy01: Prefab = null;
    @property(Prefab)
    public enemy02: Prefab = null;
    //敌机生成时间
    @property
    public createEnemyTime = 1;
    //敌机的速度
    @property
    public enemy1Speed = 0.5;
    @property
    public enemy2Speed = 0.7;

    private _currentShootTime = 0;
    private _isShooting = false;
    //当前创建的敌机时间
    private _currCreateEnemyTime = 0;
    //组合的间隔状态
    private _combinationInterval = Constant.Combination.PLAN1;

    //游戏刚开始的时候，设置当前子弹时间，使得开始即射出
    start() {
        this._init();
    }

    update(deltaTime: number) {
        this._currentShootTime += deltaTime;
        //触摸屏幕的时候并且射击时间大于周期时，就可以再发射子弹了
        if (this._isShooting && this._currentShootTime > this.shootTime) {
            this.createPlayerBullet();
            this._currentShootTime = 0;
        }

        //从一开始就一直要去记录时间，根据该时间来改变飞机创建的状态
        this._currCreateEnemyTime += deltaTime;
        //有了changePlaneMode()改变状态后，我们判断其组合方式
        if (this._combinationInterval === Constant.Combination.PLAN1) {
            //组合一：创建单一的飞机
            //目前飞机记录时间到了要求后，就创建飞机，然后重置时间
            if (this._currCreateEnemyTime > this.createEnemyTime) {
                this.createEnemyPlane();
                this._currCreateEnemyTime = 0;
            }
        } else if (this._combinationInterval === Constant.Combination.PLAN2) {
            //组合间隔为0.9，plan1的组合间隔为1
            if (this._currCreateEnemyTime > this.createEnemyTime * 0.9) {
                //通过一个随机数，来决定是组合一还是组合2，组合2就走组合2的，否则就走组合1的逻辑
                const randomCombination = math.randomRangeInt(1, 3);
                if (randomCombination === Constant.Combination.PLAN2) {
                    this.createCombination1();
                } else {
                    this.createEnemyPlane();
                }
                //将时间重置
                this._currCreateEnemyTime = 0;
            }
        } else {
            if (this._currCreateEnemyTime > this.createEnemyTime * 0.8) {
                const randomCombination = math.randomRangeInt(1, 4);
                if (randomCombination === Constant.Combination.PLAN2) {
                    this.createCombination1();
                } else if (randomCombination === Constant.Combination.PLAN3) {
                    this.createCombination2();
                }
                else {
                    this.createEnemyPlane();
                }
                //将时间重置
                this._currCreateEnemyTime = 0;
            }

        }
    }

    public addScore() {

    }


    //创建子弹
    public createPlayerBullet() {
        //子弹是预制，要调用实例化的接口
        const bullet = instantiate(this.bullet01);
        //将所有的子弹都放在这个节点下面
        bullet.setParent(this.bulletroot);
        //设置子弹应该在的位置
        const pos = this.playerplane.position;
        //子弹要和飞机的位置稍微有偏移，它们俩都没有在世界坐标系下没有偏移，所以可以直接设置，如果有的话就得加上偏移值
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        //设置子弹速度
        const bulletcomp = bullet.getComponent(Bullet);
        bulletcomp.show(this.bulletSpeed, false);
    }

    //所有的子弹默认都是玩家分组，所以要在这里重新给敌机子弹设置分组
    public createEnemyBullet(targetPos: Vec3) {
        //实例化子弹，步骤和创建玩家子弹一样
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletroot);
        //子弹在飞机前方6单位的地方
        bullet.setPosition(targetPos.x, targetPos.y, targetPos.z + 6);
        const bulletcomp = bullet.getComponent(Bullet);
        bulletcomp.show(1, true);//子弹的速度只要比两种敌机的飞行速度快即可

        const bulletCollider = bullet.getComponent(Collider);
        //设置分组
        bulletCollider.setGroup(Constant.CollisionType.ENEMY_BULLET);
        //设置掩码，因为要碰撞玩家飞机
        bulletCollider.setMask(Constant.CollisionType.SELF_PLANE);
    }

    //敌机的创建
    public createEnemyPlane() {
        //因为有两种敌机，所以需要进行随机数的选择——利用creator里带的数学公式
        const whichEnemy = math.randomRangeInt(1, 3);//包含最小不包含最大，要取1和2所以是(1,3)
        //定义一下用的哪个预制和速度，因为是会变的量，所以不能用const来定义
        let prefab: Prefab = null;
        let speed = 0;
        if (whichEnemy === Constant.EnemyType.TYPE1) {
            prefab = this.enemy01;
            speed = this.enemy1Speed;
        } else {
            prefab = this.enemy02;
            speed = this.enemy2Speed;
        }

        //生成敌机
        const enemy = instantiate(prefab);
        //将敌机设置到gameManager的节点下面
        enemy.setParent(this.node);

        //获取敌机的enemyPlane脚本组件，并通过show方法传给敌机它应有的速度
        const enemyComp = enemy.getComponent(EnemyPlane);
        enemyComp.show(this, speed, true);//单架敌机是需要发射子弹的，所以参数为TRUE

        //设置飞机的位置，水平方向移动范围为-25到25，然后垂直方向在-50的位置出生
        const randomPos = math.randomRangeInt(-25, 26);
        enemy.setPosition(randomPos, 0, -50);
    }

    //组合一的函数，组合一是一字型飞入，有五架飞机
    public createCombination1() {
        //创建五架飞机，这里定义了一个数组，其类型为Node，其数量为5
        const enemyArray = new Array<Node>(5);
        for (let i = 0; i < enemyArray.length; i++) {
            //生成敌机
            enemyArray[i] = instantiate(this.enemy01);
            const element = enemyArray[i];
            //设定父物体
            element.parent = this.node;
            //设定位置，经过度量，每架敌机之间的间隔为10，第一架飞机初始位置x为-20，之后的飞机依次加10
            //i从0开始算，第2、3、4、5架飞机x分别为-10、0、10、20
            element.setPosition(-20 + i * 10, 0, -50);
            //设置飞机的速度，这里速度二选一即可，选enemy1和2都行
            const enemyPlaneComp = element.getComponent(EnemyPlane);
            enemyPlaneComp.show(this, this.enemy1Speed, false);//组合不需要发射子弹为FALSE
        }
    }

    public createCombination2() {
        const enemyArray = new Array<Node>(7);

        const combinationPos = [
            -21, 0, -60,
            -14, 0, -55,
            -7, 0, -50,
            0, 0, -45,
            7, 0, -50,
            14, 0, -55,
            21, 0, -60,
        ]

        for (let i = 0; i < enemyArray.length; i++) {
            //生成敌机
            enemyArray[i] = instantiate(this.enemy02);
            const element = enemyArray[i];
            //设定父物体
            element.parent = this.node;
            //设定位置
            //因为数组只有7个，但是位置有21个，因此每架飞机间位置偏移为3
            const startIndex = i * 3;
            element.setPosition(combinationPos[startIndex], combinationPos[startIndex + 1], combinationPos[startIndex + 2]);
            //设置飞机的速度
            const enemyPlaneComp = element.getComponent(EnemyPlane);
            enemyPlaneComp.show(this, this.enemy2Speed, false);
        }
    }

    //判断当前是否处于触摸的状态，只有触摸状态下才能发射子弹，这里的参数值是从UImain传过来的
    public isShooting(value: boolean) {
        this._isShooting = value;
    }

    //在初始化的时候，默认等于shootTime这个值，所以第一次一定会发射一枚子弹
    //初始化的时候调用改变飞机状态
    private _init() {
        this._currentShootTime = this.shootTime;
        this.changePlaneMode();
    }

    //三次，每十秒改变一次状态，我们根据这个状态决定当前采用什么组合
    private changePlaneMode() {
        //组件身上自带定时器api——this.schedule，参数分别是回调、间隔时间、重复次数、延迟时间
        //此处让它每十秒执行一次定时器，3此过后保持这个状态
        this.schedule(this._modeChanged, 10, 3);
    }

    private _modeChanged() {
        this._combinationInterval++;
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
