/*
 * @Author: Cram
 * @Date: 2022-06-18 02:21:53
 */
import { reactive } from "vue";
import type { FormRules } from "element-plus";

export default function (ruleForm: any) {
  const validatePass = (rule: any, value: string, callback: any) => {
    let msg: undefined | Error = void 0;
    if (!value) {
      msg = new Error("请再次输入密码");
    } else if (value !== ruleForm.loginPwd) {
      msg = new Error("与第一次密码不匹配");
    }
    callback(msg);
  };
  const RegPhone: RegExp =
    /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;

  const validatePhone = (rule: any, value: string, callback: any) => {
    let msg: undefined | Error = void 0;
    if (!value) {
      msg = new Error("请输入手机号");
    } else if (!RegPhone.test(value)) {
      msg = new Error("请输入正确的手机号");
    }
    callback(msg);
  };

  const rules = reactive<FormRules>({
    loginId: [
      { required: true, message: "请输入账号", trigger: "blur" },
      { min: 5, message: "账号至少5个字符", trigger: "blur" },
    ],
    loginPwd: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 8, message: "密码至少8个字符", trigger: "blur" },
    ],
    loginPwdCheck: [{ validator: validatePass, trigger: "blur" }],
    loginPhone: [
      {
        validator: validatePhone,
        trigger: "blur",
      },
    ],
    loginAuth: [{ required: true, message: "请输入验证码", trigger: "blur" }],
  });

  return { rules, RegPhone };
}
