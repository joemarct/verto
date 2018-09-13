import { shallowMount } from "@vue/test-utils";
import Dummy from "../Dummy.vue";

describe("Dummy.vue", () => {
  test("renders Dummy", () => {
    const wrapper = shallowMount(Dummy);
    expect(wrapper.text()).toContain("Dummy");
  });
});
