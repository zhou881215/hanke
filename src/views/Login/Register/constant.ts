/*
 * @Author: Cram
 * @Date: 2022-06-17 18:37:58
 */
import { reactive } from "vue";
import { FormRules } from "element-plus";

export interface IRegisterInfo {
  loginId: "";
  loginPwd: "";
  loginPwdAgain: "";
  loginPhone: "";
  loginAuth: "";
}

export const rules = reactive<FormRules>({
  loginId: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 5, message: "账号至少5个字符", trigger: "blur" },
  ],
  loginPwd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, message: "密码至少8个字符", trigger: "blur" },
  ],
  loginPwdAgain: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, message: "密码至少8个字符", trigger: "blur" },
  ],
  loginPhone: [
    { required: true, message: "请输入正确的手机号", trigger: "blur" },
  ],
  loginAuth: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
