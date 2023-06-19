import { FC, useEffect, useRef } from "react";
import { RadioGroup } from "@headlessui/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import numeral from "numeral";
import { useFormik } from "formik";
import * as Yup from "yup";

import QuestionIcon from "@/assets/query.svg";
import { useClaimEvents, useUserAddressRemaining } from "@/hooks/useDataAPI";
import { isValidAddress } from "@/utils/isValidAddress";
import axios from "axios";
import { BannerMessage, BannerHandles } from "@/components/BannerMessage";

const ERROR_MESSAGES = {
  INSUFFICIENT:
    "The CKB received at this address has reached 300,000 CKB for this month. Please retry after the 1st of next month.",
  INVALID_ADDRESS: "Invalid address",
};

const CLAIM_AMOUNTS = [10_000, 100_000, 300_000];

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
      .test("remaining", ERROR_MESSAGES.INSUFFICIENT, (addressHash) => {
        const remaining = remainingRef.current;

        return (
          !addressHash || !(typeof remaining === "number") || remaining > 0
        );
      }),
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
    onSubmit: async (values) => {
      try {
        await axios.post("/claim_events", {
          claim_event: {
            address_hash: values.addressHash,
            amount: values.amount.toString(),
          },
        });
        await refreshClaimEvents();
        await refreshRemaining();
        alertRef.current?.open();
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

  // downlevel amount selection
  useEffect(() => {
    if (typeof remaining === "number" && values.amount > remaining) {
      const amount = [...CLAIM_AMOUNTS]
        .reverse()
        .find((item) => item <= remaining);
      if (amount) {
        setFieldValue("amount", amount);
      } else {
        setFieldError("amount", ERROR_MESSAGES.INSUFFICIENT);
      }
    }
  }, [remaining, setFieldError, setFieldValue, values.amount]);

  const alertRef = useRef<BannerHandles>(null);

  const showAmountRadio = isValid && values.addressHash;
  const canSubmit =
    isValid && !isRemainingLoading && !isSubmitting && !!values.addressHash;

  const tooltipEl = (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger type="button">
        <QuestionIcon className="w-3 h-3 mx-1 cursor-pointer" />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>
          <div className="relative rounded w-[212px] px-4 py-3 text-sm text-gray-800 bg-white">
            Your claimable amount now for this month is {formattedRemaining}{" "}
            CKB.
          </div>
          <Tooltip.Arrow
            className="text-white mb-1"
            style={{ fill: "currentcolor" }}
            width={16}
            height={8}
          />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const address = sp.get("address");
    if (address) {
      setFieldValue("addressHash", address);
      validateField("addressHash");
    }
  }, [setFieldValue, validateField]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <BannerMessage ref={alertRef} type="success">
        Claim Success
      </BannerMessage>
      <div className="w-full max-w-[524px] lg:ml-[-84px]">
        <div className="flex mb-8 flex-wrap">
          <label
            htmlFor="addressHash"
            className="flex items-center text-sm mr-4 w-full lg:h-9 mb-2 lg:w-18 lg:text-end lg:mb-0"
          >
            To address
          </label>
          <div className="flex-1 min-w-[342px]">
            <input
              autoFocus
              onChange={handleChange}
              value={values.addressHash}
              id="addressHash"
              autoComplete="off"
              placeholder="Enter your Pudge wallet address"
              className="text-gray-800 placeholder:text-gray-400 text-sm rounded py-3 px-2 w-full"
            />
            <div
              className={`text-sm text-red mt-4 text-center h-4 ${
                !!values.addressHash && !!errors.addressHash
                  ? "block"
                  : "hidden"
              }`}
            >
              {errors.addressHash}
            </div>
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
                  {tooltipEl}
                </div>
              )}
            </RadioGroup.Label>
            <div className="flex flex-1 justify-between mr-3">
              {CLAIM_AMOUNTS.map((amount) => {
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
                        className={`inline-flex items-center ${
                          disabled
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-white  cursor-pointer"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border-2 mr-1 ${
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
              {tooltipEl}
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-30 lg:w-40 h-10 mt-9 lg:mt-11 flex justify-center items-center rounded ${
          canSubmit ? "bg-purple" : "bg-purple.disabled"
        }`}
      >
        Claim
      </button>
    </form>
  );
};
