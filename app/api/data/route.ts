import { NextResponse } from 'next/server';
import { queryPostgres } from '@/app/services/postgresDb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    const field = searchParams.get('field');

    if (!table || !field) {
      return NextResponse.json(
        { error: 'Table and field parameters are required' },
        { status: 400 }
      );
    }

    // Get distinct values for dropdown
    const query = `SELECT DISTINCT ${field} FROM ${table} ORDER BY ${field}`;
    const results = await queryPostgres(query);

    return NextResponse.json(results);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
