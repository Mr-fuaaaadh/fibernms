import { useNetworkStore } from "@/store/networkStore";
import type { Device, DeviceStatus, DeviceType } from "@/types/network";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const DEVICE_TYPES: DeviceType[] = ["OLT", "ONT", "Splitter", "JJB", "Switch"];
const DEVICE_STATUSES: DeviceStatus[] = ["active", "faulty", "warning"];

interface FormValues {
  name: string;
  type: DeviceType;
  lat: number;
  lng: number;
  ports: number;
  status: DeviceStatus;
}

interface AddDeviceModalProps {
  open: boolean;
  editDevice?: Device | null;
  onClose: () => void;
}

export function AddDeviceModal({
  open,
  editDevice,
  onClose,
}: AddDeviceModalProps) {
  const { addDevice, updateDevice } = useNetworkStore();
  const isEdit = !!editDevice;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      type: "ONT",
      lat: 40.7128,
      lng: -74.006,
      ports: 4,
      status: "active",
    },
  });

  useEffect(() => {
    if (editDevice) {
      reset({
        name: editDevice.name,
        type: editDevice.type,
        lat: editDevice.lat,
        lng: editDevice.lng,
        ports: editDevice.ports,
        status: editDevice.status,
      });
    } else {
      reset({
        name: "",
        type: "ONT",
        lat: 40.7128,
        lng: -74.006,
        ports: 4,
        status: "active",
      });
    }
  }, [editDevice, reset]);

  const onSubmit = (data: FormValues) => {
    if (isEdit && editDevice) {
      updateDevice(editDevice.id, {
        name: data.name,
        type: data.type,
        lat: Number(data.lat),
        lng: Number(data.lng),
        ports: Number(data.ports),
        status: data.status,
      });
    } else {
      const newDevice: Device = {
        id: `device-${Date.now()}`,
        name: data.name,
        type: data.type,
        lat: Number(data.lat),
        lng: Number(data.lng),
        ports: Number(data.ports),
        status: data.status,
        connectedTo: [],
      };
      addDevice(newDevice);
    }
    onClose();
  };

  const labelCls =
    "block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5";
  const inputCls =
    "w-full bg-muted/30 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-smooth";
  const selectCls =
    "w-full bg-muted/30 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-smooth appearance-none cursor-pointer";
  const errorCls = "mt-1 text-[10px] text-red-400 font-mono";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md glass-elevated rounded-2xl shadow-2xl"
              data-ocid="device-modal"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40">
                <div>
                  <h2 className="font-mono font-semibold text-sm tracking-wide text-foreground">
                    {isEdit ? "EDIT DEVICE" : "ADD DEVICE"}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isEdit
                      ? `Editing ${editDevice?.name}`
                      : "Register a new network device"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  data-ocid="modal-close"
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth text-lg leading-none"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-5 py-4 space-y-4"
              >
                {/* Name */}
                <div>
                  <label htmlFor="field-name" className={labelCls}>
                    Device Name *
                  </label>
                  <input
                    id="field-name"
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="e.g. OLT-CORE-03"
                    className={inputCls}
                    data-ocid="input-device-name"
                  />
                  {errors.name && (
                    <p className={errorCls}>{errors.name.message}</p>
                  )}
                </div>

                {/* Type + Status row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="field-type" className={labelCls}>
                      Type *
                    </label>
                    <select
                      id="field-type"
                      {...register("type", { required: true })}
                      className={selectCls}
                      data-ocid="input-device-type"
                    >
                      {DEVICE_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-card">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="field-status" className={labelCls}>
                      Status *
                    </label>
                    <select
                      id="field-status"
                      {...register("status", { required: true })}
                      className={selectCls}
                      data-ocid="input-device-status"
                    >
                      {DEVICE_STATUSES.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-card capitalize"
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Lat + Lng row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="field-lat" className={labelCls}>
                      Latitude *
                    </label>
                    <input
                      id="field-lat"
                      {...register("lat", {
                        required: "Required",
                        valueAsNumber: true,
                        validate: (v) => !Number.isNaN(v) || "Must be a number",
                      })}
                      type="number"
                      step="0.0001"
                      placeholder="40.7128"
                      className={inputCls}
                      data-ocid="input-device-lat"
                    />
                    {errors.lat && (
                      <p className={errorCls}>{errors.lat.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="field-lng" className={labelCls}>
                      Longitude *
                    </label>
                    <input
                      id="field-lng"
                      {...register("lng", {
                        required: "Required",
                        valueAsNumber: true,
                        validate: (v) => !Number.isNaN(v) || "Must be a number",
                      })}
                      type="number"
                      step="0.0001"
                      placeholder="-74.0060"
                      className={inputCls}
                      data-ocid="input-device-lng"
                    />
                    {errors.lng && (
                      <p className={errorCls}>{errors.lng.message}</p>
                    )}
                  </div>
                </div>

                {/* Ports */}
                <div>
                  <label htmlFor="field-ports" className={labelCls}>
                    Ports *
                  </label>
                  <input
                    id="field-ports"
                    {...register("ports", {
                      required: "Required",
                      valueAsNumber: true,
                      min: { value: 1, message: "Minimum 1 port" },
                    })}
                    type="number"
                    min={1}
                    placeholder="4"
                    className={inputCls}
                    data-ocid="input-device-ports"
                  />
                  {errors.ports && (
                    <p className={errorCls}>{errors.ports.message}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    data-ocid="modal-cancel"
                    className="flex-1 py-2 rounded-lg border border-border/60 text-sm font-mono text-muted-foreground hover:text-foreground hover:border-border transition-smooth"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-ocid="modal-save"
                    className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-mono font-medium hover:opacity-90 transition-smooth noc-glow"
                  >
                    {isEdit ? "Save Changes" : "Add Device"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
