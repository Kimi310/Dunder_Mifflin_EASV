import {atom} from "jotai/index";
import {Property} from "@assets/models/Property.ts";

export const PropertiesAtom = atom<Property[]>([]);