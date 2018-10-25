import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import ViewTransactionDetails from "../ViewTransactionDetails.vue";

import uuid from "uuid";
import moment from "moment";

describe("ViewTransactionDetails.vue", () => {
  let transaction = {};
  let mountOptions = {};

  beforeEach(() => {
    transaction = {
      wallet: uuid(),
      id: uuid(),
      submittedAt: moment().format()
    };

    mountOptions = {
      mocks: {
        $route: {
          params: {
            transaction
          }
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    };
  });

  test("renders ViewTransactionDetails", () => {
    const wrapper = shallowMount(ViewTransactionDetails, mountOptions);
    expect(wrapper.text()).toContain("Transaction Record");
  });

  test("Displays the correct date", () => {
    transaction.submittedAt = moment("1974-04-07T16:10:05");

    const wrapper = shallowMount(ViewTransactionDetails, mountOptions);
    expect(wrapper.text()).toContain("Apr 7, 1974");
  });

  test("Displays the correct time", () => {
    transaction.submittedAt = moment("1974-04-07T16:10:05");

    const wrapper = shallowMount(ViewTransactionDetails, mountOptions);
    expect(wrapper.text()).toContain("4:10:05 PM");
  });
});
