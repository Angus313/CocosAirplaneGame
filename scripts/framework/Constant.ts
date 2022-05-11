
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Constant
 * DateTime = Sat May 07 2022 11:07:55 GMT+0800 (香港标准时间)
 * Author = Angus313313
 * FileBasename = Constant.ts
 * FileBasenameNoExtension = Constant
 * URL = db://assets/scripts/framework/Constant.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */


export class Constant {
    //两种飞机，三种组合
    //静态变量，飞机类型
    public static EnemyType = {
        TYPE1: 1,
        TYPE2: 2,
    }
    //组合类型
    public static Combination = {
        PLAN1: 1,
        PLAN2: 2,
        PLAN3: 3,
    }

    //碰撞类型，这里的类型顺序要对应碰撞矩阵里设置的顺序
    public static CollisionType = {
        //要设置二进制的值，所以使用了左移符号
        SELF_PLANE: 1 << 1,
        ENEMY_PLANE: 1 << 2,
        SELF_BULLET: 1 << 3,
        ENEMY_BULLET: 1 << 4,
    }
}
