import * as ArrayUtils from "../utils/array_utils";
import * as Keywords from "./keywords";
import * as Delimiters from "./delimiters";


export function forNew(isNew: boolean | undefined): readonly string[] {
  return isNew ? [Keywords._new, Delimiters.space] : ArrayUtils.empty();
}

export function forStatic(isStatic: boolean | undefined): readonly string[] {
  return isStatic ? [Keywords._static, Delimiters.space] : ArrayUtils.empty();
}

export function forPartial(isPartial: boolean | undefined): readonly string[] {
  return isPartial ? [Keywords.partial, Delimiters.space] : ArrayUtils.empty();
}

export function forModifier(modifier: Hexarc.CSharpDom.Modifier | undefined): readonly string[] {
  return modifier ? [modifier, Delimiters.space] : ArrayUtils.empty();
}

export function forAccess(access: Hexarc.CSharpDom.Access | Hexarc.CSharpDom.Access[] | undefined): readonly string[] {
  if (access == null) return ArrayUtils.empty();
  else if (Array.isArray(access)) return access.flatMap(x => [x, Delimiters.space]);
  else return [access, Delimiters.space];
}

export function forAssignment(assignment: "const" | "readonly" | undefined): readonly string[] {
  return assignment ? [assignment, Delimiters.space] : ArrayUtils.empty();
}

export function forAsync(isAsync: boolean | undefined): readonly string[] {
  return isAsync ? [Keywords.async, Delimiters.space] : ArrayUtils.empty();
}