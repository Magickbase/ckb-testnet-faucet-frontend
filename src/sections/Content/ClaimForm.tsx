import { FC, useEffect, useRef } from "react";
import { RadioGroup } from "@headlessui/react";
import Tooltip from "rc-tooltip";
import numeral from "numeral";
import { useFormik } from "formik";
import * as Yup from "yup";

import QuestionIcon from "../../assets/query.svg";
import {
  useClaimEvents,
  useUserAddressRemaining,
} from "../../hooks/useDataAPI";
import { isValidAddress } from "../../utils/isValidAddress";
import axios from "axios";

const ERROR_MESSAGES = {
  INSUFFICIENT:
    "Your claimable amount for this month is 0 and will be replenished on the 1st of next month, please switch an address.",
  INVALID_ADDRESS: "Invalid address",
};

export const ClaimForm: FC = () => {
  const { mutate: refreshClaimEvents } = useClaimEvents();
  const validationSchema = Yup.object().shape({
    addressHash: Yup.string()
      .trim()
      .test(
        "address validation",
        ERROR_MESSAGES.INVALID_ADDRESS,
        isValidAddress
      )
      .test(
        "remaining",
        "The amount you claimed cannot be greater than your remaining.",
        (addressHash) => {
          const remaining = remainingRef.current;

          return (
            !addressHash || !(typeof remaining === "number") || remaining > 0
          );
        }
      ),
  });
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    isValid,
    isSubmitting,
    validateField,
    setFieldError,
  } = useFormik({
    initialValues: {
      addressHash: "",
      amount: 10000,
    },
    validationSchema,
    onSubmit: async (values, { validateField }) => {
      try {
        await axios.post("/claim_events", {
          claim_event: {
            address_hash: values.addressHash,
            amount: values.amount.toString(),
          },
        });
        await refreshClaimEvents();
        await refreshRemaining();

        setTimeout(() => validateField("addressHash"), 500);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorDetail: string | undefined = (e as any)?.response?.data
          ?.errors?.[0]["detail"];
        errorDetail && setFieldError("addressHash", errorDetail);
        return;
      }
    },
  });

  const {
    data: remaining,
    isLoading: isRemainingLoading,
    mutate: refreshRemaining,
  } = useUserAddressRemaining(values.addressHash);
  const remainingRef = useRef(remaining);
  remainingRef.current = remaining;

  const formattedRemaining =
    typeof remaining === "number" && numeral(remaining).format("0,0");

  useEffect(() => {
    typeof remaining === "number" && validateField("addressHash");
  }, [remaining, validateField]);
  const showAmountRadio = isValid && values.addressHash && !isRemainingLoading;
  const canSubmit =
    isValid && !isRemainingLoading && !isSubmitting && !!values.addressHash;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <div className="w-full max-w-[524px] lg:ml-[-22px]">
        <div className="flex items-center mb-8 flex-wrap">
          <label
            htmlFor="addressHash"
            className="inline-block text-sm mr-4 w-full mb-2 lg:w-18 lg:text-end lg:mb-0"
          >
            To address
          </label>
          <div className="flex-1 min-w-[342px]">
            <input
              autoFocus
              onChange={handleChange}
              id="addressHash"
              placeholder="Enter your Pudge wallet address"
              className="text-gray-800 placeholder:text-gray-400 text-sm rounded py-3 px-2 w-full"
            />
            {!!values.addressHash && (
              <div className="text-sm text-red mt-4">{errors.addressHash}</div>
            )}
          </div>
        </div>

        <div
          className={`flex justify-between relative ${
            showAmountRadio ? "block" : "hidden"
          }`}
        >
          <RadioGroup
            value={values.amount}
            onChange={(amount) => setFieldValue("amount", amount)}
            name="amount"
            className="flex flex-wrap items-center flex-1"
          >
            <RadioGroup.Label className="flex justify-between items-center text-sm leading-4 lg:mr-4 w-full mb-4 lg:mb-0 lg:text-end lg:w-18">
              <span className="lg:text-end lg:w-18">Amount</span>
              {formattedRemaining && (
                <div className="flex lg:hidden items-center h-full  text-gray-200">
                  <span className="text-sm text-gray">
                    Remaining: {formattedRemaining}
                  </span>
                  <Tooltip
                    placement="top"
                    overlayClassName="fixed text-gray-800 rounded"
                    overlay={
                      <div className="relative rounded w-[212px] px-4 py-3 mb-4 text-sm text-gray-800 bg-white">
                        Your claimable amount now for this month is{" "}
                        {formattedRemaining} CKB.
                        <span className="absolute bottom-0 left-1/2 rotate-45 w-3 h-3 translate-x-[-50%] translate-y-1/2 rounded-sm bg-white " />
                      </div>
                    }
                  >
                    <QuestionIcon className="w-3 h-3 mx-1 cursor-pointer" />
                  </Tooltip>
                </div>
              )}
            </RadioGroup.Label>
            <div className="flex flex-1 justify-between mr-3">
              {[10_000, 100_000, 300_000].map((amount) => {
                const disabled = Number(remaining || 0) < amount;
                return (
                  <RadioGroup.Option
                    disabled={disabled}
                    value={amount}
                    key={amount}
                  >
                    {({ checked }) => (
                      <label
                        tabIndex={1}
                        className={`inline-flex items-center cursor-pointer ${
                          disabled
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-white"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border-white border-2 mr-1 ${
                            disabled ? "border-gray-700" : "border-white"
                          } ${
                            checked
                              ? "bg-purple"
                              : disabled
                              ? "bg-gray-800"
                              : ""
                          }`}
                        />
                        <span>{numeral(amount).format("1,000")}</span>
                      </label>
                    )}
                  </RadioGroup.Option>
                );
              })}
            </div>
          </RadioGroup>
          {formattedRemaining && (
            <div className="hidden lg:flex items-center absolute right-0 top-0 h-full pl-5 translate-x-full text-gray-200">
              <span className="text-sm text-gray">
                Remaining: {formattedRemaining}
              </span>
              <Tooltip
                placement="top"
                overlayClassName="fixed text-gray-800 rounded"
                overlay={
                  <div className="relative rounded w-[212px] px-4 py-3 mb-4 text-sm text-gray-800 bg-white">
                    Your claimable amount now for this month is{" "}
                    {formattedRemaining} CKB.
                    <span className="absolute bottom-0 left-1/2 rotate-45 w-3 h-3 translate-x-[-50%] translate-y-1/2 rounded-sm bg-white " />
                  </div>
                }
              >
                <QuestionIcon className="w-3 h-3 mx-1 cursor-pointer" />
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-40 h-10 flex justify-center items-center rounded ${
          canSubmit ? "bg-purple mt-11" : "bg-purple.disabled"
        }`}
      >
        Claim
      </button>
    </form>
  );
};
