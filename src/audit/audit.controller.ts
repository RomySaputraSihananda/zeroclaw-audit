import { Body, Controller, HttpCode, Post } from '@nestjs/common';

interface AuditPayload {
  event: string;
  timestamp: string;
  tool: string;
  success: boolean;
  duration_ms: number;
  error: string | null;
  args: unknown;
}

@Controller('audit')
export class AuditController {
  @Post()
  @HttpCode(200)
  receive(@Body() payload: AuditPayload) {
    const status = payload.success ? '✅' : '❌';
    const ms = payload.duration_ms ?? '-';
    const time = payload.timestamp ?? new Date().toISOString();

    console.log(`\n─── tool call ──────────────────────────────`);
    console.log(`  ${status}  ${payload.tool}`);
    console.log(`  time     : ${time}`);
    console.log(`  duration : ${ms}ms`);
    if (payload.error) {
      console.log(`  error    : ${payload.error}`);
    }
    if (payload.args !== null && payload.args !== undefined) {
      console.log(`  args     : ${JSON.stringify(payload.args, null, 2)}`);
    }
    console.log(`────────────────────────────────────────────\n`);

    return { ok: true };
  }
}
