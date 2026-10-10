/**
 * MongoDB ids are 24-char hex ObjectIds. Prisma throws on malformed ids,
 * so check ids coming from the URL or forms before querying.
 */
export function isObjectId(id: unknown): id is string {
  return typeof id === "string" && /^[a-f\d]{24}$/i.test(id);
}
