/***************************策略对象  算法******************************/
let strategies = {
    isNonEmpty(value, errorMsg) {
        if (value === "") {
            return errorMsg
        }
    },
    minLength(value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg
        }
    },
    isMobile(value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg
        }
    }
}
/***************************Validator类  环境******************************/
class Validator {
    constructor() {
        this.cache = []
    }
    add(dom, rules) {
        let self = this;
        for (let i = 0, rule; rule = rules[i++];) {
            let strategyAry = rule.strategy.split(':');
            let errorMsg = rule.errorMsg;
            self.cache.push(function () {
                let strategy = strategyAry.shift();
                strategyAry.unshift(dom.value);
                strategyAry.push(errorMsg);
                return strategies[strategy].apply(dom, strategyAry);
            });
        }
    }
    start() {
        for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
            let errorMsg = validatorFunc();
            if (errorMsg) {
                return errorMsg;
            }
        }
    }
}