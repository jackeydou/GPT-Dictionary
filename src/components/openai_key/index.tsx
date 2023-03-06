import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function OpenAIKeyModal(props: {
  isOpen: boolean;
  closeModal: () => void;
  onSave: (key: string) => void;
}) {
  const { isOpen, closeModal, onSave } = props;
  const [value, setValue] = useState("");
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Set Your Open AI Key
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX....."
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 py-2 px-3 outline-none"
                  />
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium focus:outline-none mr-8"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white focus:outline-none"
                    onClick={() => onSave(value)}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
