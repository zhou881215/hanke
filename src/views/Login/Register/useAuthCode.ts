/*
 * @Author: Cram
 * @Date: 2022-06-18 02:46:52
 */
import { ref, computed } from "vue";

export default function (registerForm: any, RegPhone: RegExp) {
  const authCodeFlag = ref<boolean>(false);

  const authCodeText = ref<string>("获取验证码");

  const canSend = computed(() => RegPhone.test(registerForm.loginPhone));

  const getAuthCode = () => {
    authCodeFlag.value = true;
    let count = 60;
    authCodeText.value = count + "s";
    const timer = setInterval(() => {
      count--;
      authCodeText.value = count + "s";
      if (count <= 0) {
        authCodeFlag.value = false;
        authCodeText.value = "获取验证码";
        clearInterval(timer);
      }
    }, 1000);
  };
  return { authCodeFlag, authCodeText, canSend, getAuthCode };
}
