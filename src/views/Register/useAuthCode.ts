/*
 * @Author: Cram
 * @Date: 2022-06-18 02:46:52
 */
import { ref, computed } from "vue";

export default function (store: any, registerForm: any, RegPhone: RegExp) {
  const authCodeText = ref<string>("获取验证码");

  const canSend = computed(() => RegPhone.test(registerForm.loginPhone));

  let timer: any = null;

  const getAuthCode = async (phone: string) => {
    let count = await store.dispatch("loginStore/getAuthCode", phone);
    authCodeText.value = count + "s";
    timer = setInterval(() => {
      count--;
      authCodeText.value = count + "s";
      if (count <= 0) {
        authCodeText.value = "获取验证码";
        clearInterval(timer);
      }
    }, 1000);
  };

  return { authCodeText, canSend, getAuthCode, timer };
}
