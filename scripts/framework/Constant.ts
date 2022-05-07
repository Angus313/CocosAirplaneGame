
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
}
